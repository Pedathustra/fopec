 if exists(select * from sys.procedures where name = 'delCompanyBusinessFocus')
begin
	drop proc delCompanyBusinessFocus;
end
go

create proc delCompanyBusinessFocus
	@business_focus_id int,
	@company_Id int
as 
	set nocount on;

	delete 
	from company_business_focus	
	where business_focus_id = @business_focus_id
		and company_id = @company_id
	;

	return 0;

go
 if exists(select * from sys.procedures where name = 'insCompanyBusinessFocus')
begin
	drop proc insCompanyBusinessFocus;
end
go

create proc insCompanyBusinessFocus
	@business_focus_id int,
	@company_Id int
as 
	set nocount on;

	if exists(select * from company_business_focus where company_id = @company_id and business_focus_id = @business_focus_id)
	begin 
		return -1
	end

	insert into company_business_focus(
		company_id,
		business_focus_id
	)
	values 
	(
		@company_id,
		@business_focus_id
	)
	return 0;

go
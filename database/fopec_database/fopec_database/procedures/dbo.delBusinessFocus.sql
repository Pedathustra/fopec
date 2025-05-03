if exists(select * from sys.procedures where name = 'delBusinessFocus')
begin
	drop proc delBusinessFocus;
end
go

create proc delBusinessFocus
	@id varchar(255)
as 
	set nocount on;

	if exists(select * from company_business_focus where business_focus_id = @id)
	begin 
		return -1;
	end
	delete from business_focus where id = @id;
	return 0;

go
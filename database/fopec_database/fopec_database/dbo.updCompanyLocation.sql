if exists(select * from sys.procedures where name = 'delCompanyLocation')
begin
	drop proc delCompanyLocation;
end
go

create proc delCompanyLocation
	@company_id int,
	@address_id int,
	@isHQ bit

as 
	set nocount on;

	update company_location
	set isHQ = @isHQ
	where	company_id = @company_id
		and	address_id = @address_id;
	return 0;
go